<?php

namespace App\Http\Controllers;

use App\Http\Resources\PositionCollection;
use App\Models\Position;

class PositionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $positions = Position::all();
        $positionCollection = new PositionCollection($positions);

        return response()->json([
            'success' => true,
            'positions' => $positionCollection
        ]);
    }
}
