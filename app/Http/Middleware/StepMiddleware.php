<?php

namespace App\Http\Middleware;

use Closure;

class StepMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  integer  $step
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $step = $request->step;
        if (! $request->session()->has('step' . $step) ) {

            $step--;
            for ($step; $step > 0; $step--){
                if ($step == 1)
                    return redirect('/step/'.$step);
                if ($request->session()->has('step' . $step))
                    return redirect('/step/'.$step);
            }
        }
        return $next($request);
    }
}
