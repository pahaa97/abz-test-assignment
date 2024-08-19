<?php

namespace App\Dto;

use Illuminate\Http\Request;

readonly class CreateUserDto
{
    /**
     * @param string $name
     * @param string $email
     * @param string $phone
     * @param int $position_id
     */
    public function __construct(
        public string $name,
        public string $email,
        public string $phone,
        public int $position_id,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            name: $request->input('name'),
            email: $request->input('email'),
            phone: $request->input('phone'),
            position_id: $request->input('position_id'),
        );
    }
}
