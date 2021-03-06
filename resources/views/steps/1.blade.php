<div class="wrap" ng-controller="ObjectivesController">
    <aside>
        <ul>
            <li ng-repeat="objective in objectives" ng-class="{ active:isSelectedTab(objective.id) }"
                ng-click="selectTab(objective.id)"><% objective.title %></li>
        </ul>
    </aside>
    <div class="content">
        <div class="form-wrap" ng-repeat="objective in objectives" ng-show="isSelectedTab(objective.id)">
            <div class="image">
                <img ng-src="{{ asset('/images/<%objective.image%>') }}" alt="<%objective.title%>"/>
            </div>
            <p class="title"><span><%objective.title%></span> | <%objective.excerpt%></p>
            <p class="desc"><%objective.description%></p>
        </div>
    </div>
</div>