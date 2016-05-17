@extends('layouts.app')

@section('content')

    <section class="intro">
        <h2>Setup Your Campaign</h2>
        <h5><span>Step {{ $step }}</span> | {{ $steps_desc[$step] }}</h5>
    </section>

    <section class="steps-navigation">
        <ul>

        <?php $z_index = 6;
              $left = 18.7; ?>

        @for($i = 1; $i < 6; $i++)
                <?php $class = ''; ?>
            @if ($i < $step)
                <?php $class = 'passed'; ?>
            @elseif($i == $step)
                <?php $class = 'active'; ?>
            @endif
            <li class="{{ $class }}" style="z-index: {{ $z_index }}; left: {{ $left*($i-1) }}%;"><a href="{{ ($class == 'passed') ?  url('/step', [$i]) : 'javascript:void(0)'}}">Step {{ $i }}</a></li>
            <?php $z_index--; ?>
        @endfor

        </ul>
    </section>

    <section class="step">
        @include('steps.'.$step)
    </section>

    <section class="buttons">
        @if($step !== 1)
            <div class="prev"><a href="{{ url('/step', [$step - 1]) }}"><i class="fa"></i>Back</a></div>
        @endif
        @if($step !== 5)
            <div class="next"><a href="{{ url('/step', [$step + 1]) }}">Next Step<i class="fa"></i></a></div>
        @endif
    </section>

@endsection