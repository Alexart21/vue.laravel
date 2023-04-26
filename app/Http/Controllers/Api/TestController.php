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
        return response()->json([
            'data' => [
                [

                       'Понедельник',


                         '08:00 - 09:00',

                    '09:00 - 10:00',

                   '10:00 - 11:00',

                    '12:00 - 13:00',

                    '14:00 - 15:00',

                ],
                [
                    'Вторник',

                   '08:00 - 09:00',

                   '09:00 - 10:00',

                    '10:00 - 11:00',

                    '12:00 - 13:00',

                     '14:00 - 15:00',

                ],
            ]
        ]);
    }
}
