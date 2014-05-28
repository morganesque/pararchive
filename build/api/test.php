<?php

$type = "story";

function createUser()
{
	$u = R::dispense('user');
	
	$u->username = 'tommo';
	$u->password = 'fish';
	$u->firstname = 'Tom';
	$u->surname = 'Morgan';
	$u->status = 'logged in';
	$u->created = time();
	$u->updated = time();
	$u->type = 'fisherman';

	$id = R::store($u);	
}

function updateUser()
{
	$u = R::load('user',1);

	$u->latest_story = 1;
	$id = R::store($u);
}


function createUserStory()
{
	$user = NULL;
	$user = R::load('user',3); // loads Tom
	$story = R::dispense("story");
	
	$story->name = "Bob's Day Out";

	$user->ownStoryList[] = $story;
	R::store($user);	
}

function createStoryBlock()
{
	$story = R::load('story',1);
	$block = R::dispense('block');

	$block->what = 'My Mum was born';
	$block->when = '24th February 1945';
	$block->where = 'Stoke on Trent';

	$story->ownBlockList[] = $block;
	R::store($story);
}

// $story = R::load('story',1);
// var_dump($story->export());

// createUser();
// createUserStory();

// createStoryBlock();

updateUser();

?>