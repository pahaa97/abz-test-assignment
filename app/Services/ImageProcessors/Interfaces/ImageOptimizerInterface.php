<?php

namespace App\Services\ImageProcessors\Interfaces;

interface ImageOptimizerInterface
{
    public function optimize(): self;
}
