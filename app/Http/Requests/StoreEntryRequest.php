<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEntryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $nameMaxLength = config('constants.entries.name_max_length');
        $maxCalories = config('constants.entries.max_calories');

        return [
            'name' => "required|string|max:$nameMaxLength",
            'calories' => "required|integer|between:1,$maxCalories",
            'is_cheat' => 'required|boolean',
            'created_at' => 'integer|min:0|nullable',
        ];
    }
}
