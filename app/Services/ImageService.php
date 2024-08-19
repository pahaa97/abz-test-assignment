<?php

namespace App\Services;

use AllowDynamicProperties;
use App\Services\ImageProcessors\AbstractImageProcessor;

#[AllowDynamicProperties] class ImageService
{
    public function __construct(AbstractImageProcessor $imageProcessor)
    {
        $this->imageProcessor = $imageProcessor;
    }

    public function prepareUserAvatar(): void
    {
        $this->imageProcessor->optimize()
            ->crop(1024, 1024, 0, 0)
            ->resize(70, 70);
    }

    public function getImagePath(): string
    {
        return $this->imageProcessor->getPath();
    }
}
