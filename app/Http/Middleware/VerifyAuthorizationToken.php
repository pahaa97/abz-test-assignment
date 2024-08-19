<?php

namespace App\Http\Middleware;

use App\Models\AuthorizationToken;
use Closure;
use Illuminate\Http\JsonResponse;

class VerifyAuthorizationToken
{
    /**
     * @param $request
     * @param Closure $next
     * @return JsonResponse|mixed
     */
    public function handle($request, Closure $next)
    {
        $tokenValue = $request->header('Token');

        if (!$tokenValue) {
            return response()->json([
                'success' => false,
                'message' => 'Token not provided'
            ], 401);
        }

        $token = AuthorizationToken::where('token', $tokenValue)->first();

        if (!$token || !$token->isValid()) {
            return response()->json([
                'success' => false,
                'message' => 'The token expired.'
            ], 401);
        }

        $token->markAsUsed();

        return $next($request);
    }
}
