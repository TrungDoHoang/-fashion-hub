<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'required',
            'title' => 'string|required',
            'price' => 'numeric|required|min:0',
            'quantity' => 'integer|required|min:0',
            'description' => 'string|required',
            'category_id' => 'integer|required',
            'image' => 'string|required',
        ];
    }
}
