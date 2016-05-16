<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $table = 'topic_management';

    protected $fillable = ['topic_name', 'topic_description', 'status'];

    protected $dates = ['created_at', 'updated_at'];

    public function createdAdmin(){
        return $this->belongsTo('App\Administrator', 'created_by');
    }

    public function modifiedAdmin(){
        return $this->belongsTo('App\Administrator', 'modified_by');
    }

}
