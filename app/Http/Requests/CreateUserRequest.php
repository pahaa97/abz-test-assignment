<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|regex:/^\+?[1-9]\d{1,14}$/|unique:users,phone',
            'position_id' => 'required|integer|exists:positions,id',
            'photo' => 'required|mimes:jpeg,jpg|max:5120|dimensions:min_width=70,min_height=70',
        ];
    }

    /**
     * @param $validator
     * @return void
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            if ($this->emailOrPhoneExists()) {
                throw new HttpResponseException(
                    response()->json([
                        'success' => false,
                        'message' => 'User with this phone or email already exist',
                    ], 409)
                );
            }
        });
    }

    /**
     * @return bool
     */
    protected function emailOrPhoneExists(): bool
    {
        $emailExists = User::where('email', $this->input('email'))->exists();
        $phoneExists = User::where('phone', $this->input('phone'))->exists();

        return $emailExists || $phoneExists;
    }

    /**
     * @param Validator $validator
     * @return mixed
     */
    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation Error',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}
