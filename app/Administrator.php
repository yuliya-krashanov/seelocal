<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Administrator extends Model
{
    protected $table = 'admin_users';

    protected $fillable = ['name', 'email', 'password', 'status'];

    protected $dates = ['createdDate', 'modifiedDate'];

    protected $hidden = ['password', 'sha_key'];
}
