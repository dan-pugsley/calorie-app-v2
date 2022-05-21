<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEntryRequest extends FormRequest
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
            'name' => "string|max:$nameMaxLength",
            'calories' => "integer|between:1,$maxCalories",
            'is_cheat' => 'boolean',
            'created_at_ts' => 'integer|min:0|nullable',
        ];
    }
}
