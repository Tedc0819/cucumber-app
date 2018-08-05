class TestPage extends Page {
  get elements() {
    return {
      'button': `~ComputeSumButton`
    }
  }
}

module.exports = TestPage
