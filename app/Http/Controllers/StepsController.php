<?php

namespace App\Http\Controllers;

use App\Campaign_Interest;
use App\Campaign_Objective;
use App\Campaign_Plan;
use Illuminate\Http\Request;

use App\Http\Requests;

class StepsController extends Controller
{

    public function __construct(){
        $this->middleware('auth');
    }

    /**
     * @return string
     */
    public function getObjectives(){
       return Campaign_Objective::all()->toJson();
    }

    /**
     * @return string
     */
    public function getInterests(){
        return Campaign_Interest::all()->toJson();
    }

    /**
     * @return string
     */
    public function getPlans(){
        return Campaign_Plan::all()->toJson();
    }


    /**
     * @param $step
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
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

    public function saveStepData(Request $request){
        $data = $request->all();
        foreach($data as $name => $item){
            $request->session()->put($name, $item);
        }
    }

}
