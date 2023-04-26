<?php

namespace App\Http\Controllers;

use App\Models\User;

class TestController extends Controller
{
    public function index()
    {
        $users = User::all();
        if($users){
            return response()->json([
                'users' => $users
            ]);
        }else{
            return response()->json([
                'users' => null
            ]);
        }
    }

    public function test(){
        return response()->json([
             'test' => 'here_blin'
        ]);
    }
}
