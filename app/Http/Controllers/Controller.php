<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Response;

abstract class Controller
{
    /**
     * success response method.
     *
     * @param JsonResource $resource
     * @return JsonResponse
     */
    public function sendResource(JsonResource $resource)
    {
        return Response::json([
            'success' => true,
            $resource::$wrap => $resource,
        ]);
    }

    /**
     * success response method.
     *
     * @param ResourceCollection $resource
     * @return JsonResponse
     */
    public function sendCollection(ResourceCollection $resource)
    {
        return Response::json([
            'success' => true,
            'page' => $resource->currentPage(),
            'total_pages' => $resource->lastPage(),
            'total_'.$resource::$wrap => $resource->total(),
            'count' => $resource->perPage(),
            'links' => [
                'next_url' => $resource->nextPageUrl(),
                'prev_url' => $resource->previousPageUrl(),
            ],
            $resource::$wrap => $resource->items(),
        ]);
    }

    /**
     * return error response.
     *
     * @param string $message
     * @param array $errors
     * @param int $status
     * @return JsonResponse
     */
    public function sendError(string $message, array $errors = [], int $status = 400): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'fails' => !empty($errors) ? $errors : null,
        ], $status);
    }


    /**
     * return Unauthorized response.
     *
     * @param string $error
     * @param int $code
     *
     * @return JsonResponse
     */
    public function unauthorizedResponse(string $error = 'Forbidden', int $code = 403): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $error,
        ];

        return response()->json($response, $code);
    }
}
