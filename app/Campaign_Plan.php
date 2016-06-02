<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Campaign_Plan extends Model
{
    protected $table = 'campaign_plans';

    protected $fillable = ['title', 'price_0', 'display_ads_shown', 'fully_optimized_display_ads', 'conversion_optimised_landing', 'brand_awareness', 'lead_generation'];
}
