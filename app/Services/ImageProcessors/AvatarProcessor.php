<?php

namespace App\Services\ImageProcessors;

use App\Services\ImageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class AvatarProcessor
{
    public function prepareAvatar(UploadedFile $avatar): string
    {
        $filename = md5(time() . $avatar->getClientOriginalName()) . '.' . $avatar->getClientOriginalExtension();
        $avatarPath = $avatar->storeAs('avatars', $filename, 'public');

        try {
            $fullAvatarPath = Storage::disk('public')->path($avatarPath);

            $imageProcessor = new TinyPngImageProcessor($fullAvatarPath);
            $imageService = new ImageService($imageProcessor);
            $imageService->prepareUserAvatar();
        } catch (\Throwable $e) {
            $this->deleteAvatarByFileName($filename);
            throw $e;
        }

        return $filename;
    }

    public function deleteAvatarByFileName(?string $filename)
    {
        Storage::delete('avatars/' . $filename);
    }
}
