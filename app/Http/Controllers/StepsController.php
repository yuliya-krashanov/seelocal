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


    public function uploadImages(Request $request){
        return $request->file();
    }

    public function moveImagesFromTemp($images){
        foreach($images as $image){
            rename(public_path() . 'images/temp/'. $image, public_path() . 'images/uploads/' . $image);
        }

        if ($handle = opendir(public_path() .'images/temp/')) {
            while (false !== ($file = readdir($handle))) {
                if ($file != "." && $file != "..") {
                    unlink(public_path() .'images/temp/'. $file);
                }
            }
            closedir($handle);
        }

    }

    public function saveCampaign(Request $request){

    }


    public function doPayment(){

    }

}
