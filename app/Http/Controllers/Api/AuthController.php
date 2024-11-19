<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function login(LoginRequest $request){

        $credentials = $request->validated();
        if( !Auth::attempt($credentials)){
            return response()->json([
                'message' => '',
                'errors' => ['email'=> ['Provided email or password is incorrect']]
            ], 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json(compact('user','token'), 200);
    }
    public function signup(SignupRequest $request){
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create($data);
        $token = $user->createToken('main')->plainTextToken;
        $message = 'Signup successful';

        return response()->json(compact('user','token','message'), 201);
    }
    public function logout(Request $request){
        
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
