<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campaign_Interest extends Model
{
    public $table = 'campaign_interests';

    public $fillable = ['name'];
}
