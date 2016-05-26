<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCampaignPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('campaign_plans', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->decimal('price');
            $table->integer('display_ads_shown');
            $table->boolean('fully_optimized_display_ads');
            $table->boolean('conversion_optimised_landing');
            $table->boolean('brand_awareness');
            $table->boolean('lead_generation');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('campaign_plans');
    }
}
