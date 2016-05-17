<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class StepsController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }


    public function show($step){
        $steps_desc = [
            1 => 'choose the objective of your campaign',
            2 => 'enter your campaign demographics',
            3 => 'upload your images',
            4 => 'choose your budget and timescale',
            5 => 'review and pay'
        ];
        return view('steps.main', compact('step', 'steps_desc'));
    }
}
