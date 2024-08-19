<?php

namespace App\Services;

use App\Dto\CreateUserDto;
use App\Models\User;

class UserService
{
    public function createUser(CreateUserDto $createUserDto, string $avatarUrl)
    {
        $user = new User();
        $user->name = $createUserDto->name;
        $user->email = $createUserDto->email;
        $user->phone = $createUserDto->phone;
        $user->position_id = $createUserDto->position_id;
        $user->photo_url = $avatarUrl;
        $user->save();

        return $user;
    }
}
