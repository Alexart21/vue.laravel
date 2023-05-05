<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ticket;

class TestController extends Controller
{
    public function save(Request $request){
        $data = $request->input('days');
        $ticket = Ticket::findOrFail(1);
        $ticket->days = json_encode($data);
        $ticket->save();
        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function test()
    {
        $data = Ticket::findOrFail(1);
        $data = json_decode($data->days);
        /*var_dump($data);
        die;*/
        return response()->json(['data' => $data]);
        /* return response()->json([
            'data' => [
                [

                   [
                    'string' => 'понедельник',
                    'timestamp' => 1111111111111,
                   ],

                    [
                        'isActive' => true,
                        'time' => '00:00 - 00:00',
                    ],
                    [
                      'isActive' => true,
                       'time' => '00:00 - 00:00',
                    ],
                ],
                ]
        ]); */
    }
}
