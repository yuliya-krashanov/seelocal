<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    protected $dates = ['created_at', 'updated_at'];

    protected $casts = [];

    protected $fillable = ['transection_id', 'price', 'payment_status', 'status'];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function campaign(){
        return $this->belongsTo('App\Campaign');
    }
}
