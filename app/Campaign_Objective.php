<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campaign_Objective extends Model
{
    protected $table = 'campaign_objectives';

    protected $fillable = ['title', 'excerpt', 'description', 'image'];

    protected $dates = ['created_at', 'updated_at'];

    public function setImageAttribute($value){
        $this->attributes['image'] = trim($value);
    }
}
