<?php

namespace App\Services\ImageProcessors\Interfaces;

interface ImageResizerInterface
{
    public function resize(int $width, int $height): self;
}
