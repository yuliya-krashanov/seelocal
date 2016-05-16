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
        return view('steps.main', ['step' => $step]);
    }
}
