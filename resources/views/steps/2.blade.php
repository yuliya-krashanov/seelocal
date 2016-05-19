<aside>
    <ul>
        <li ng-class="{ active:isSelectedTab(1) }" ng-click="selectTab(1)">Details</li>
        <li ng-class="{ active:isSelectedTab(2) }" ng-click="selectTab(2)">Location</li>
        <li ng-class="{ active:isSelectedTab(3) }" ng-click="selectTab(3)">Demographics</li>
        <li ng-class="{ active:isSelectedTab(4) }" ng-click="selectTab(4)">Interests</li>
        <li ng-class="{ active:isSelectedTab(5) }" ng-click="selectTab(5)">Keywords</li>
        <li ng-class="{ active:isSelectedTab(6) }" ng-click="selectTab(6)">Target Websites</li>
    </ul>
</aside>
<div class="content">
    <div class="form-wrap" ng-show="isSelectedTab(1)">    </div>
    <div class="form-wrap" ng-show="isSelectedTab(2)">   </div>
    <div class="form-wrap" ng-show="isSelectedTab(3)">   </div>
    <div class="form-wrap" ng-show="isSelectedTab(4)">   </div>
    <div class="form-wrap" ng-show="isSelectedTab(5)">   </div>
    <div class="form-wrap" ng-show="isSelectedTab(6)">   </div>
</div>