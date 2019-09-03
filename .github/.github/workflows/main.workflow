workflow "Build and Publish" {
  on = "push"
  resolves = ["Test"]
}

action "Test" {
  uses = "actions/setup-node@7a3ce8362699742a34a1590e93c9b75e4d0d6dff"
}
