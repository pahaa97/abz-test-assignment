<?php

namespace App\Http\Controllers;

use App\Dto\CreateUserDto;
use App\Http\Requests\CreateUserRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\AuthorizationToken;
use App\Models\User;
use App\Services\ImageProcessors\AvatarProcessor;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'count' => 'integer|min:1|max:100',
            'page' => 'integer|min:1',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation failed', $validator->errors()->toArray(), 400);
        }

        $users = User::orderBy('id', 'desc')
            ->paginate($request->input('count', 5));

        if ($request->input('page') > $users->lastPage()) {
            return $this->sendError('Page not found', [], 404);
        }

        return $this->sendCollection(new UserCollection($users));
    }

    /**
     * Store a newly created resource in storage.
     * @throws \Throwable
     */
    public function store(CreateUserRequest $request, AvatarProcessor $avatarProcessor): JsonResponse
    {
        try {
            $createUserDto = CreateUserDto::fromRequest($request);
            $avatarFilename = $avatarProcessor->prepareAvatar($request->file('photo'));
            $avatarUrl = route('files.show', ['avatar' => $avatarFilename]);

            $user = $this->userService->createUser($createUserDto, $avatarUrl);
        } catch (\Throwable $e) {
            $avatarProcessor->deleteAvatarByFileName($avatarFilename ?? null);
            throw $e;
        }

        return response()->json([
            'success' => true,
            "user_id" => $user->id,
            "message" => "New user successfully registered"
        ]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function show(Request $request): JsonResponse
    {
        $validator = Validator::make(
            ['userId' => $request->route('userId')], [
            'userId' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return $this->sendError('The user with the request did does not exist', $validator->errors()->toArray(), 400);
        }

        $user = User::find($request->route('userId'));

        if ($user === null) {
            return $this->sendError('User not found', [], 400);
        }

        return $this->sendResource(new UserResource($user));
    }

    public function getToken()
    {
        $token = AuthorizationToken::generate();

        return response()->json([
            'success' => true,
            'token' => $token->token,
        ]);
    }

    /**
     * @param string $avatar
     * @return \Illuminate\Http\Response
     */
    public function getAvatar(string $avatar)
    {
        $path = storage_path('app/public/avatars/' . $avatar);

        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file);
        $response->header("Content-Type", $type);

        return $response;
    }
}
