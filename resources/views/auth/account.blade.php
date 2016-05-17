@extends('layouts.app')

@section('content')
    <p>Hi, {{ Auth::user()->first_name }}!</p>
@endsection