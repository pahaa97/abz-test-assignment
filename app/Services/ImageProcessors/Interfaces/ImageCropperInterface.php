<?php

namespace App\Services\ImageProcessors\Interfaces;

interface ImageCropperInterface
{
    public function crop(int $width, int $height, int $x, int $y): self;
}
