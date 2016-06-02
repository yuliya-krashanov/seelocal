<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campaign_Location extends Model
{
    protected $table = 'campaign_locations';

    public function type(){
        return $this->belongsTo('App\Campaign_Type');
    }
}
