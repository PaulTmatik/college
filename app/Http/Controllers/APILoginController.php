<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class APILoginController extends Controller
{
    public function login() {
        $credentials = request(['u_guid', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'token' => $token,
            'type' => 'bearer',
            'expires' => auth('api')->factory()->getTTL() * 60, // time to expiration
        ]);
    }
}
