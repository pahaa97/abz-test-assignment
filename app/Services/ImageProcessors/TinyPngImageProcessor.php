<?php

namespace App\Services\ImageProcessors;

class TinyPngImageProcessor extends AbstractImageProcessor
{
    public function __construct(string $imagePath)
    {
        parent::__construct($imagePath);
        \Tinify\setKey("vTzQD4ztJNMc2GNVJXLqkfff7mZhlwyQ");
    }

    public function optimize(): TinyPngImageProcessor
    {
        $image = \Tinify\fromFile($this->imagePath);
        $image->toFile($this->imagePath);
        return $this;
    }

    public function resize(int $width, int $height): TinyPngImageProcessor
    {
        $image = \Tinify\fromFile($this->imagePath);
        $resized = $image->resize(array(
            "method" => "fit",
            "width" => $width,
            "height" => $height
        ));
        $resized->toFile($this->imagePath);
        return $this;
    }
}
