import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import moxios from 'moxios';
import Question from '@/components/Question.vue';

describe('Question', () => {
  let wrapper;

  beforeEach(() => {
    moxios.install();

    wrapper = shallowMount(Question, {
      propsData: {
        dataQuestion: {
          title: 'The title',
          body: 'The body',
        },
      },
    });
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const see = (text, selector) => {
    const wrap = selector ? wrapper.find(selector) : wrapper;

    expect(wrap.html()).contain(text);
  };

  const type = (selector, text) => {
    const node = wrapper.find(selector);

    node.element.value = text;
    node.trigger('input');
  };

  const click = (selector) => {
    wrapper.find(selector).trigger('click');
  };

  it('presents the title and the body', () => {
    see('The title');
    see('The body');
  });

  it('can be edited', () => {
    expect(wrapper.contains('input[name=title]')).to.be.false;

    click('#edit');

    expect(wrapper.find('input[name=title]').element.value).to.be.equal('The title');
    expect(wrapper.find('textarea[name=body]').element.value).to.be.equal('The body');
  });

  it('hides the edit button during edit mode', () => {
    expect(wrapper.contains('#edit')).to.be.true;

    click('#edit');

    expect(wrapper.contains('#edit')).to.be.false;
  });

  it('updates the question after being edited', (done) => {
    click('#edit');

    type('input[name=title]', 'Changed title');
    type('textarea[name=body]', 'Changed body');

    moxios.stubRequest(/questions\/\d+/, {
      status: 200,
      response: {
        title: 'Changed text',
        body: 'Changed body',
      },
    });

    click('#update');

    see('Changed title');
    see('Changed body');

    moxios.wait(() => {
      see('Your question has been updated.');

      done();
    });
  });

  it('can cancel out of edit mode', () => {
    click('#edit');

    type('input[name=title]', 'Changed title');

    click('#cancel');

    see('The title');
  });
});
