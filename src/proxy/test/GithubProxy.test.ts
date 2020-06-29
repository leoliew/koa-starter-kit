import { githubProxy } from '../'
import { Constant, Logger } from '../../lib'
import * as nock from 'nock'

describe('github proxy 测试', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  test('模拟获取用户数据成功', async () => {
    const username = 'leoliew'
    nock(githubProxy.baseUrl)
      .persist()
      .get(`/users/${username}`)
      .reply(200, function () {
        return {
          'login': 'leoliew',
          'id': 3422918,
          'node_id': 'MDQ6VXNlcjM0MjI5MTg=',
          'avatar_url': 'https://avatars0.githubusercontent.com/u/3422918?v=4',
          'gravatar_id': '',
          'url': 'https://api.github.com/users/leoliew',
          'html_url': 'https://github.com/leoliew',
          'followers_url': 'https://api.github.com/users/leoliew/followers',
          'following_url': 'https://api.github.com/users/leoliew/following{/other_user}',
          'gists_url': 'https://api.github.com/users/leoliew/gists{/gist_id}',
          'starred_url': 'https://api.github.com/users/leoliew/starred{/owner}{/repo}',
          'subscriptions_url': 'https://api.github.com/users/leoliew/subscriptions',
          'organizations_url': 'https://api.github.com/users/leoliew/orgs',
          'repos_url': 'https://api.github.com/users/leoliew/repos',
          'events_url': 'https://api.github.com/users/leoliew/events{/privacy}',
          'received_events_url': 'https://api.github.com/users/leoliew/received_events',
          'type': 'User',
          'site_admin': false,
          'name': 'Leo Liu',
          'company': null,
          'blog': '',
          'location': 'Guangzhou, Guangdong, China',
          'email': null,
          'hireable': true,
          'bio': 'hello world',
          'twitter_username': null,
          'public_repos': 69,
          'public_gists': 12,
          'followers': 44,
          'following': 88,
          'created_at': '2013-01-30T01:46:35Z',
          'updated_at': '2020-06-28T03:38:34Z'
        }
      })
    const result = await githubProxy.userInfo({username})
    expect(result.login).toBe(username)
  })
})
