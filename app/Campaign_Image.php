<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campaign_Image extends Model
{
    protected $table = 'campaign_images';

    protected $fillable = ['image'];

    public function campaign(){
        return $this->belongsTo('App\Campaign');
    }
}
