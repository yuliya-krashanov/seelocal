<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    protected $table = 'campaign_master';

    protected $fillable = ['campaign_name', 'campaign_type', 'campaign_plan', 'objective', 'url', 'campaign_logo', 'campaign_image'];
}
