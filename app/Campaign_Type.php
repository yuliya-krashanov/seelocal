<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campaign_Type extends Model
{
    protected $table = 'campaign_type';

    protected $fillable = ['gender', 'languages', 'keywords', 'placements', 'interests'];

    public function campaign(){
        return $this->belongsTo('App/Campaign');
    }

    public function locations(){
        return $this->hasMany('App/Campaign_Location');
    }
}
