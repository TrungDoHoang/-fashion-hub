<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected function transformResponse($data)
    {
        return [
            'currentPage' => $data->currentPage(),
            'from' => $data->firstItem(),
            'lastPage' => $data->lastPage(),
            'data' => $data->items(),
            'perPage' => $data->perPage(),
            'to' => $data->lastItem(),
            'total' => $data->total(),
        ];
    }

    public function notFound($message = 'Not Found')
    {
        return response([
            'status' => false,
            'message' => $message . ' Not Found',
        ], Response::HTTP_NOT_FOUND);
    }

    public function deleteSuccess($message = 'Delete Successfully')
    {
        return response([
            'status' => true,
            'message' => $message . ' Delete Successfully',
        ], Response::HTTP_OK);
    }
}
