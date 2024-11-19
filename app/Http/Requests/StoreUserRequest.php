<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'name' => [
                'required', // Field is required
                'string',   // Must be a string
                'max:255',  // Max length is 255 characters
            ],
            'email' => [
                'required',       // Field is required
                'string',         // Must be a string
                'email',          // Must be a valid email format
                'max:255',        // Max length is 255 characters
                'unique:users,email',   // Email must be unique in the 'users' table
            ],
            'password' => [
                'required',          // Field is required
                'string',            // Must be a string
                'min:8',             // At least 8 characters
                'max:255',           // Max length is 255 characters
                'regex:/[a-z]/',     // At least one lowercase letter
                'regex:/[A-Z]/',     // At least one uppercase letter
                'regex:/[0-9]/',     // At least one number
                'regex:/[@$!%*#?&]/',// At least one special character
                'confirmed',         // Must match the 'password_confirmation' field
            ],
            'confirmed' => 'required|string|min:8'
        ];
    }
    /**
     * Override validated() to hash the password.
     */
    public function validated($key = null, $default = null)
    {
        $data = parent::validated($key, $default);

        // Encrypt the password
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        return $data;
    }
}
