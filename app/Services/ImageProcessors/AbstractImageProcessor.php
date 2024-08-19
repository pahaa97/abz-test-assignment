<?php

namespace App\Services\ImageProcessors;

use App\Services\ImageProcessors\Interfaces\ImageCropperInterface;
use App\Services\ImageProcessors\Interfaces\ImageOptimizerInterface;
use App\Services\ImageProcessors\Interfaces\ImageResizerInterface;

abstract class AbstractImageProcessor implements ImageCropperInterface, ImageOptimizerInterface, ImageResizerInterface
{
    public function __construct(
        protected string $imagePath,
    ) {}

    public function crop(int $width, int $height, int $x, int $y): TinyPngImageProcessor
    {
        list($width, $height) = getimagesize($this->imagePath);

        $minSize = min($width, $height);

        $srcX = ($width - $minSize) / 2;
        $srcY = ($height - $minSize) / 2;

        $srcImage = imagecreatefromjpeg($this->imagePath);

        $dstImage = imagecreatetruecolor($minSize, $minSize);

        imagecopyresampled($dstImage, $srcImage, 0, 0, $srcX, $srcY, $minSize, $minSize, $minSize, $minSize);

        imagejpeg($dstImage, $this->imagePath);

        return $this;
    }

    public function getPath(): string
    {
        return $this->imagePath;
    }
}
