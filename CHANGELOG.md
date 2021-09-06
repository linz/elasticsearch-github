<a name="0.1.1"></a>
## [0.1.1](https://github.com/linz/elasticsearch-github/compare/v0.1.0...v0.1.1) (2021-09-06)


### Features

* force fetch depth so changelog can be generated ([680ec47](https://github.com/linz/elasticsearch-github/commit/680ec47))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/linz/elasticsearch-github/compare/v0.0.4...v0.1.0) (2021-09-06)


### Features

* force angular style for changelogs ([865fdbb](https://github.com/linz/elasticsearch-github/commit/865fdbb))



<a name="0.0.4"></a>
## [0.0.4](https://github.com/linz/elasticsearch-github/compare/v0.0.3...v0.0.4) (2021-09-06)


### Features

* correct token name ([3a0a476](https://github.com/linz/elasticsearch-github/commit/3a0a476))



<a name="0.0.3"></a>
## [0.0.3](https://github.com/linz/elasticsearch-github/compare/v0.0.2...v0.0.3) (2021-09-06)


### Features

* linzjs/lambda v1.1.0 ([1feda9f](https://github.com/linz/elasticsearch-github/commit/1feda9f))



<a name="0.0.2"></a>
## 0.0.2 (2021-09-06)


### Bug Fixes

* correct event name for workflows ([3b8e0fc](https://github.com/linz/elasticsearch-github/commit/3b8e0fc))
* correctly type workflow_job events ([038cd60](https://github.com/linz/elasticsearch-github/commit/038cd60))
* trace all events ([bac5a2e](https://github.com/linz/elasticsearch-github/commit/bac5a2e))
* track all workflow runs ([74c2bdf](https://github.com/linz/elasticsearch-github/commit/74c2bdf))
* use the hook name as the `[@type](https://github.com/type)` ([4d560e5](https://github.com/linz/elasticsearch-github/commit/4d560e5))
* use the last commit for timestamp of push ([1ea9fc2](https://github.com/linz/elasticsearch-github/commit/1ea9fc2))


### Features

* 400 if no matching action can be found for a hook ([8e16517](https://github.com/linz/elasticsearch-github/commit/8e16517))
* change how events are cleaned before inserting ([554535a](https://github.com/linz/elasticsearch-github/commit/554535a))
* enable issue comment action ([f32f56c](https://github.com/linz/elasticsearch-github/commit/f32f56c))
* ignore when skipped ([52f9a7b](https://github.com/linz/elasticsearch-github/commit/52f9a7b))
* include git hash/version in logs ([98c401f](https://github.com/linz/elasticsearch-github/commit/98c401f))
* initial commit ([9ed41de](https://github.com/linz/elasticsearch-github/commit/9ed41de))
* lambda function to ship github webhooks to elasticsearch ([ca2b373](https://github.com/linz/elasticsearch-github/commit/ca2b373))
* more logging around why hooks do not process ([5e83d47](https://github.com/linz/elasticsearch-github/commit/5e83d47))
* record issue comments ([dc0a189](https://github.com/linz/elasticsearch-github/commit/dc0a189))
* rename stack to GithubWebhook ([4dd2fc6](https://github.com/linz/elasticsearch-github/commit/4dd2fc6))
* switch to `[@linzjs](https://github.com/linzjs)/lambda` ([e240614](https://github.com/linz/elasticsearch-github/commit/e240614))
* track all unknown events into a other category ([2813199](https://github.com/linz/elasticsearch-github/commit/2813199))
* track all workflow_jobs not just completed ([4296b15](https://github.com/linz/elasticsearch-github/commit/4296b15))
* use a single elasticsearch index for all hooks ([a815699](https://github.com/linz/elasticsearch-github/commit/a815699))
* **deps:** bump [@linzjs](https://github.com/linzjs)/lambda from 0.3.0 to 0.3.1 ([#5](https://github.com/linz/elasticsearch-github/issues/5)) ([3018116](https://github.com/linz/elasticsearch-github/commit/3018116))
* track how long workflow_jobs are ([b3be0e9](https://github.com/linz/elasticsearch-github/commit/b3be0e9))
* track the type of webhook with a `[@type](https://github.com/type)` field ([3a8ba43](https://github.com/linz/elasticsearch-github/commit/3a8ba43))
* track when repos are stared ([2d73941](https://github.com/linz/elasticsearch-github/commit/2d73941))
* track when we get the push event as commits can be very old ([a3a7bc2](https://github.com/linz/elasticsearch-github/commit/a3a7bc2))
* track which action matched ([6aa31c5](https://github.com/linz/elasticsearch-github/commit/6aa31c5))



