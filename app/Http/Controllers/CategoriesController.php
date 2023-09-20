<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('limit', 10); // Số lượng sản phẩm trên mỗi trang (mặc định là 10)
        $categories = Category::query()->paginate($perPage);
        return $this->transformResponse(CategoryResource::collection($categories));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $request->validated();
        $category = Category::create($request->all());

        return response([
            'message' => 'Category created successfully!',
            'category' => new CategoryResource($category)
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $result = Category::find($id);
        if (!$result) {
            return response()->json(['message' => 'Not Found'], Response::HTTP_NOT_FOUND);
        }
        return new CategoryResource($result);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->notFound('Category');
        } else {
            $data = $request->validated();
            $category->update($data);
            $category->touch();
            return response(new CategoryResource($category), Response::HTTP_OK);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->notFound('Category');
        }
        $category->delete();
        return $this->deleteSuccess('Category');
    }
}
