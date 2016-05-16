@extends('layouts.app')

@section('content')
    <nav class="steps">
        <ul>
            <li></li>
        </ul>
    </nav>
    @include('steps.'.$step)

    <div class="buttons">
        @if($step !== 1)
            <div class="prev"><a href="{{ url('/step/', [$step - 1]) }}"><i class="fa"></i>Back</a></div>
        @endif
        @if($step !== 5)
            <div class="next"><a href="{{ url('/step/', [$step + 1]) }}">Next Step<i class="fa"></i></a></div>
        @endif
    </div>

@endsection