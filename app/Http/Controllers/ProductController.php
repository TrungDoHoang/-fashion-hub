<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\VoteProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('limit', 10);
        $products = Product::query()->paginate($perPage);
        return response($this->transformResponse(ProductResource::collection($products)));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $request->validated();
        $category = Category::find($request->category_id);
        if ($category) {
            $product = Product::create($request->all());
            $product->rating()->create([
                'rate' => 0,
                'count' => 0
            ]);
            $product->images()->create([
                'url' => $request->image,
            ]);
            return response(([
                'message' => 'Product created successfully',
                'product' => new ProductResource($product)
            ]), Response::HTTP_CREATED);
        } else {
            return response([
                'message' => "Can't found category",
                "status" => false,
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return $this->notFound('Product');
        } else {
            return new ProductResource($product);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request,  $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return $this->notFound('Product');
        } else {
            $data = $request->validated();

            if (count($product->images) === 0) {
                $product->images()->create([
                    'url' => $request->image,
                ]);
            } else {
                $product->images()->update([
                    'url' => $request->image,
                ]);
            }
            $product->update($data);

            $product->touch();
            return response(new ProductResource($product), Response::HTTP_OK);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return $this->notFound('Product');
        } else {
            $product->delete();
            return $this->deleteSuccess('Product');
        }
    }

    /**
     * Vote rating for product
     */
    public function vote(VoteProductRequest $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return $this->notFound('Product');
        } else {
            $request->validated();
            $totalRating = $product->rating->rate * $product->rating->count;
            $newTotalRating = $request->rate + $totalRating;
            $newCount = $product->rating->count + 1;
            $averageRating = $newTotalRating / $newCount;
            $product->rating()->update([
                'rate' => $averageRating,
                'count' => $newCount
            ]);

            $product->save();
            $product->touch();
            $product->rating()->touch();

            $product = Product::find($id);

            return response(([
                'message' => 'Successfully voted for the product',
                'product' => new ProductResource($product)
            ]), Response::HTTP_OK);
        }
    }
}
