<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'price' => (float)$this->price,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'category' => $this->category ? [
                'id' => $this->category->id,
                'title' => $this->category->title,
                'slug' => $this->category->slug
            ] : null,
            'images' => $this->images ? $this->images->map(function ($image) {
                return $image->url;
            })->toArray() : null,
            'rating' => $this->rating ? [
                'rate' => round($this->rating->rate, 1),
                'count' => $this->rating->count,
            ] : null,
            "createdAt" => $this->created_at->format('Y-m-d H:i:s'),
            "updatedAt" => $this->updated_at->format('Y-m-d H:i:s')
        ];;
    }
}
