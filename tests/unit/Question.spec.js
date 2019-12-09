import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import Question from '@/components/Question.vue';

describe('Question', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Question, {
      propsData: {
        dataQuestion: {
          title: 'The title',
          body: 'The body',
        },
      },
    });
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

  it('updates the question after being edited', () => {
    click('#edit');

    type('input[name=title]', 'Changed title');
    type('textarea[name=body]', 'Changed body');

    click('#update');

    see('Changed title');
    see('Changed body');
  });

  it('can cancel out of edit mode', () => {
    click('#edit');

    type('input[name=title]', 'Changed title');

    click('#cancel');

    see('The title');
  });
});
